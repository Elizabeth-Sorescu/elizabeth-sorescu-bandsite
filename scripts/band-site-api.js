const apiKey = "ccbecdb8-3000-4f60-b849-b42ffd742109";
class BandSiteApi {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseURL = "https://project-1-api.herokuapp.com/";
  }

  async postComment(comment) {
    return createNewComment(this.baseURL, this.apiKey, comment);
  }

  async getComments() {
    return fetchComments(this.baseURL, this.apiKey);
  }

  async getShows() {
    return fetchShows(this.baseURL, this.apiKey);
  }
}

const createNewComment = async (url, apiKey, comment) => {
  let response = null;
  try {
    response = await axios.post(url + "comments?api_key=" + apiKey, comment);
  } catch (error) {
    console.log("The post new comments has the error: " + error);
  }
  return response.data;
};

const fetchComments = async (url, apiKey) => {
  let sortedComments = null;
  try {
    const response = await axios.get(url + "comments?api_key=" + apiKey);
    const comments = response.data;
    sortedComments = comments.sort((elem1, elem2) => {
      return elem2.timestamp - elem1.timestamp;
    });
    for (let comment of sortedComments) {
      generateComment(comment, mainCommentContainer);
    }
  } catch (error) {
    console.log("The get comments has the error: " + error);
  }
  return sortedComments;
};

const fetchShows = async (url, apiKey) => {
  debugger;
  try {
    const response = await axios.get(url + "showdates?api_key=" + apiKey);
    const shows = response.data;
    for (let show of shows) {
      generateDiv(show, divGroup);
    }
  } catch (error) {
    console.log("The get shows has the error: " + error);
  }
};

let bandSiteApi = new BandSiteApi(apiKey);
