import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableRow, TextField, IconButton, Button } from '@material-ui/core';
import { AddBox, Delete } from '@material-ui/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteData, getData, setData } from '../data/data';

const EditGroup = (props) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const group = getData(Number(id));
    const [tableData, setTableData] = useState(group?.links || []);
    const [groupName, setGroupName] = useState(group?.name || "");

    const handleNameChange = (event) => {
        setGroupName(event.target.value);
    }

    const handleChange = (event, index) => {
        const newTableData = [...tableData];
        newTableData[index] = event.target.value;
        setTableData(newTableData);
    };

    const handleAddRow = () => {
        const newTableData = [...tableData];
        newTableData.push('https://');
        setTableData(newTableData);
    };

    const handleRemoveRow = (index) => {
        const newTableData = [...tableData];
        newTableData.splice(index, 1);
        setTableData(newTableData);
    };

    const saveGroup = () => {
        group.links = tableData;
        group.name = groupName;
        setData(group);
        navigate('/folders')
    }

    const deleteGroup = () => {
        deleteData(group.id);
        navigate('/folders')
    }

    return (
        <div>
            <TextField
                value={groupName}
                onChange={(e) => handleNameChange(e)}
            />
            <Table style={{ width: "500px" }}>
                <TableBody>
                    {
                        tableData.map((link, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <TextField style={{ width: "100%" }}
                                        value={link}
                                        onChange={(e) => handleChange(e, index)}
                                    />
                                </TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleRemoveRow(index)}>
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                    <TableRow>
                        <TableCell colSpan={4}>
                            <IconButton onClick={handleAddRow}>
                                <AddBox />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <Button variant="contained" color="primary"
                onClick={saveGroup}>
                Save
            </Button>
            <Button variant="contained" color="primary"
                onClick={deleteGroup}>
                Delete
            </Button>
        </div>
    );
}

export default EditGroup;
