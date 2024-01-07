const apiKey = "ccbecdb8-3000-4f60-b849-b42ffd742109";

class BandSiteApi {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseURL = "https://project-1-api.herokuapp.com/";
  }
  postComment(comment) {
    postCommentAsync(this.baseURL, this.apiKey, comment);
  }

  getComments() {
    getCommentsAsync(this.baseURL, this.apiKey);
  }
}

const postCommentAsync = async (url, apiKey, comment) => {
  try {
    const response = await axios.post(url + "?api_key=" + apiKey, comment);

    console.log(response.data);
  } catch (error) {
    console.log("this is postComments error: " + error);
  }
};

const getCommentsAsync = async (url, apiKey) => {
  let sortedComments = null;
  try {
    const response = await axios.get(url + "?api_key=" + apiKey);
    const comments = response.data.data;
    sortedComments = comments.sort((elem1, elem2) => {
      return elem1.date - elem2.date;
    });
  } catch (error) {
    // console.log("this is getComments error: " + error);
  }
  return sortedComments;
};

let bandSiteApi = new BandSiteApi(apiKey);
// let comments = bandSiteApi.getComments(); //this is causing the error
// console.table(comments);
// bandSiteApi.postComment(comment);
