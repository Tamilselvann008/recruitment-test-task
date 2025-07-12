// pages/UserList.tsx
import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  TablePagination,
} from "@mui/material";
import { Search, Clear } from "@mui/icons-material";
import UserForm from "../../common/UserForm";
import { UserService } from "../../../services/userServices";
import { showSuccess } from "../../../utils/common";
import { Loader } from "../../common/Loader";
import { PopupModel } from "../../common/Popup";
import { GridView } from "./GridView";
import { TableView } from "./TableView";

export interface User {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}

const UserList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [view, setView] = useState<"table" | "card">("table");
  const [users, setUsers] = useState<User[]>([]);
  const [filter, setFilter] = useState({
    totalUsers: 0,
    page: 0,
    rowsPerPage: 6,
  });
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState({
    openForm: false,
    deletePopup: false,
    selectedUser: null as User | null,
  });

  const handleDelete = (user: User) => {
    setPopup((prev) => ({ ...prev, deletePopup: true, selectedUser: user }));
  };

  const handleEdit = (user: User) => {
    setPopup((prev) => ({ ...prev, openForm: true, selectedUser: user }));
  };

  const handleCreate = () => {
    setPopup((prev) => ({ ...prev, openForm: true, selectedUser: null }));
    getUsers();
  };

  const handleFormClose = () => {
    setPopup((prev) => ({ ...prev, openForm: false, selectedUser: null }));
    getUsers();
  };

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setFilter((prev) => ({ ...prev, page: newPage }));
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFilter((prev) => ({
      ...prev,
      rowsPerPage: parseInt(event.target.value, 10),
      page: 0,
    }));
  };

  const filteredUsers = users.filter((user) =>
    user.first_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deleteUser = async (id: number) => {
    try {
      setLoading(true);
      const response = await UserService.delete(id);
      if (response.status === 200) {
        showSuccess("User deleted successfully");
        setUsers((prev) => prev.filter((user) => user.id !== id));
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setLoading(false);
    }
  };

  const getUsers = useCallback(async () => {
    try {
      setLoading(true);
      const data = await UserService.getAll(
        filter.page + 1,
        filter.rowsPerPage
      );

      setUsers(data.data || []);
      setFilter((pre) => ({
        ...pre,
        totalUsers: data.total,
        page: data.page - 1,
      }));
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  }, [filter.page, filter.rowsPerPage]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return loading ? (
    <Loader />
  ) : (
    <Box sx={{ p: 4, backgroundColor: "#f4f6f9", minHeight: "100vh" }}>
      <Typography variant="h5" mb={2}>
        Users
      </Typography>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Box display="flex" gap={2}>
          <Button
            variant={view === "table" ? "contained" : "outlined"}
            onClick={() => setView("table")}
          >
            Table
          </Button>
          <Button
            variant={view === "card" ? "contained" : "outlined"}
            onClick={() => setView("card")}
          >
            Card
          </Button>
        </Box>

        <Box display="flex" gap={2}>
          <TextField
            size="small"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {searchTerm ? (
                    <IconButton onClick={() => setSearchTerm("")}>
                      <Clear />
                    </IconButton>
                  ) : (
                    <Search />
                  )}
                </InputAdornment>
              ),
            }}
          />
          <Button variant="contained" onClick={handleCreate}>
            Create User
          </Button>
        </Box>
      </Box>

      {view === "table" ? (
        <TableView
          users={filteredUsers}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      ) : (
        <GridView
          users={filteredUsers}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      )}
      <TablePagination
        component="div"
        count={filter.totalUsers}
        page={filter.page}
        onPageChange={handleChangePage}
        rowsPerPage={filter.rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[3, 6, 12]}
      />

      {popup.openForm && (
        <UserForm
          open={popup.openForm}
          onClose={handleFormClose}
          initialData={popup.selectedUser || null}
        />
      )}

      {popup.deletePopup && (
        <PopupModel
          onCancel={() => setPopup((prev) => ({ ...prev, deletePopup: false }))}
          onconfirm={() => {
            if (popup.selectedUser?.id) {
              deleteUser(popup.selectedUser.id);
            }
            setPopup((prev) => ({ ...prev, deletePopup: false }));
          }}
          message="Are you sure you want to delete this user?"
        />
      )}
    </Box>
  );
};

export default UserList;
