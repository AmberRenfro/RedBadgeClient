let APIURL = '';

switch (window.location.hostname) {
    case 'localhost' || '127.0.0.1':
        APIURL = 'https://all-abroad-server.herokuapp.com/';
        break;
    
    case 'all-abroad-client.herokuapp.com/':
        APIURL = 'https://all-abroad-server.herokuapp.com/';
        break;

    default: 
        APIURL = 'https://all-abroad-server-.herokuapp.com/';
}

export default APIURL;