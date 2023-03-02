import { Data } from "./data"

export const CHROME_STORAGE_LOCATION = "mygroups_test";

export const setData = (data) => {
    // @ts-ignore
    chrome.storage.sync.set({ CHROME_STORAGE_LOCATION: data }, function () {
        //  A data saved callback omg so fancy
        console.log("The data is saved");
    });
}

export const getData = (): Promise<Data[]> => {
    // @ts-ignore
    return chrome.storage.sync.get(/* String or Array */[CHROME_STORAGE_LOCATION])
        .then((items) => { return items[CHROME_STORAGE_LOCATION] });
}