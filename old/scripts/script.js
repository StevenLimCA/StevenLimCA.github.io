const ApiKey = "UCwcAVfZ8o7PQsIW6L4UsK3Lt0KPyuKbs-Z1CezqTxk";
const ApiUrl = "https://api.unsplash.com/photos/random";
axios
  .get(ApiUrl + "?client_id=" + ApiKey)
  .then((res) => {
    console.log(res);
    const mystyle = document.querySelector(".hero").style;

    mystyle.background = `url(${res.data.urls.regular})`;
    mystyle.backgroundRepeat = "no-repeat";
    mystyle.backgroundSize = "cover";
    mystyle.backdropFilter = "blur(2rem)";
  })
  .catch((err) => {
    console.log(err);
  });
