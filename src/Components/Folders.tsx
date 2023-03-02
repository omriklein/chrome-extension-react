import React, { useState, Component } from 'react';
import { Button, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { dataMap, addData } from '../data/data.ts';
import { useNavigate } from 'react-router-dom';
import { AddBox, ChromeReaderMode, Send } from '@material-ui/icons';
import "./Folders.css"
import {setData } from "../data/data.service"

function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

const Folders = () => {
    const [groups, setGroups] = useState(dataMap)
    const navigate = useNavigate();
    const headers = Object.keys(groups[0]);

    const EditLinks = (item) => {
        navigate(`/editgroup/${item.id}`);
    };
    const OpenLinks = (item) => {
        const tabs: number[] = []
        console.log(tabs);
        item.links.forEach((link) => {
            //@ts-ignore
            chrome.tabs.create({
                            url: link
                        }, async (tab) => {
                            try {
                                if (tabs.push(tab.id) >= item.links.length) {
                                    //@ts-ignore
                                    await chrome.tabs.group({tabIds: tabs}, function(groupId) {
                                        // @ts-ignore
                                        chrome.tabGroups.update(groupId, { collapsed: false, title: item.name });
                                    });
                                }
                            } catch (error) {
                                await delay(1000);
                                //@ts-ignore
                                chrome.tabs.group({tabIds: tabs}, function(groupId) {
                                    // @ts-ignore
                                    chrome.tabGroups.update(groupId, { collapsed: false, title: item.name });
                                });
                            }
                        });
            })
    };

    const handleAddButton = () => {
        const newTableData = [...groups];
        const newEntry = { id: groups.length, name: "new group", links: [] };
        newTableData.push(newEntry);
        addData(newEntry);
        setGroups(newTableData);

        setData(dataMap)
    }

    return (
        <div>
            <h2 className="button-new">headline or something...</h2>
            {/* Why can't I override the class of the button */}
            <Button className="button-new" variant="contained" color="primary" > hello button</Button>
            <Table>
                {/* <TableHead>
                <TableRow>
                    {headers.map(item => (
                        <TableCell>{item}</TableCell>
                    ))}
                    <TableCell>  </TableCell>
                </TableRow>
            </TableHead> */}
                <TableBody>
                    {groups.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                <Button className="Button" onClick={() => OpenLinks(item)}>
                                    {item.name}
                                </Button>
                            </TableCell>
                            <TableCell>{item.links.join(", ")}</TableCell>
                            <TableCell>
                                <Button className="button-new" variant="contained" color="primary" onClick={() => EditLinks(item)}>
                                    Edit &nbsp;  <Send />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                    <TableRow>
                        <TableCell colSpan={3}>
                            <IconButton onClick={handleAddButton}>
                                <AddBox />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
}

export default Folders;