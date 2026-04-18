import { apikey } from "../../../constants/apiUrls";
import { baseApi } from "../../api/baseApi";

const eventsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEvents: builder.query({
      query: () => ({
        url: "/events.json",
        params: {
          apikey,
        },
        method: "GET",
      }),
    }),
  }),
});

export const { useGetEventsQuery } = eventsApi;
