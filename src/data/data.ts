export type Data = {
    id: number,
    name: string,
    links: string[]
}

export const initData = (newData: { [key: number]: Data }) => {
    dataMap = newData;
}
export const setData = (newData: Data) => {
    dataMap[newData.id] = newData
}

export const getData = (id: number) => {
    return dataMap[id];
}
export const deleteData = (id: number) => {
    delete dataMap[id];
}

export let dataMap: { [key: number]: Data } = {
    0:  {
        id: 0,
        name: "Work" ,
        links: [
            "https://www.google.com",
            "https://www.purple.com",
        ]
    },
    1: {
        id: 1,
        name: "Studie" ,
        links: [
            "https://www.google2.com",
            "https://www.purple2.com",
        ]
    },
  };
