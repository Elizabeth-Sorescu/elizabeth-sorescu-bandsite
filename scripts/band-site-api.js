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

  async deleteComment(id) {
    return deleteAComment(this.baseURL, this.apiKey, id);
  }
}

const createNewComment = async (url, apiKey, comment) => {
  let response = null;
  try {
    response = await axios.post(url + "comments?api_key=" + apiKey, comment);
  } catch (err) {
    console.error(err);
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
      await generateComment(comment, mainCommentContainer);
    }
  } catch (err) {
    console.error(err);
  }
  return sortedComments;
};

const fetchShows = async (url, apiKey) => {
  let shows = null;
  try {
    const response = await axios.get(url + "showdates?api_key=" + apiKey);
    shows = response.data;
  } catch (err) {
    console.error(err);
  }
  return shows;
};

const deleteAComment = async (url, apiKey, id) => {
  let response = null;
  try {
    response = await axios.delete(
      url + "comments/" + id + "?api_key=" + apiKey
    );
  } catch (err) {
    console.error(err);
  }
  return response;
};

let bandSiteApi = new BandSiteApi(apiKey);
