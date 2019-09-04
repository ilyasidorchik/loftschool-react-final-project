const LOCAL_STORAGE_KEY = 'profile';

export const getProfileInLocalStorage = () => {
    return JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY));
};

export const setProfileInLocalStorage = (localStorageValue) => {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(localStorageValue));
};