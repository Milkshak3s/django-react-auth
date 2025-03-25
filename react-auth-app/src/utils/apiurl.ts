const apiUrl = () => {
    if (process.env.NODE_ENV == 'production') {
    return 'https://squaddie.milkshakes.cloud/';
  }
else {
    return 'http://localhost:8000/';
}}

export default apiUrl