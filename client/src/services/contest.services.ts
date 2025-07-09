import { fetchApi } from "../utils/FetchApi";

class ContestServices {
  public contestFetchData;
  constructor() {
    this.contestFetchData = fetchApi.init("/contest");
  }
}
