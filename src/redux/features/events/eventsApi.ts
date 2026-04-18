import { apikey } from "../../../constants/apiUrls";
import { baseApi } from "../../api/baseApi";

const eventsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Getting events
    getEvents: builder.query({
      query: ({ keyword, city, page = 0 }) => {
        let url = `/events.json?apikey=${apikey}&page=${page}&size=20`;
        if (keyword) url += `&keyword=${encodeURIComponent(keyword)}`;
        if (city) url += `&city=${encodeURIComponent(city)}`;
        return { url };
      },
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        return `${endpointName}-${queryArgs.keyword || ""}-${queryArgs.city || ""}`;
      },
      merge: (currentCache, newItems) => {
        if (newItems._embedded?.events) {
          if (!currentCache._embedded) {
            currentCache._embedded = { events: [] };
          }
          currentCache._embedded.events.push(...newItems._embedded.events);
          currentCache.page = newItems.page;
        }
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.page !== previousArg?.page;
      },
    }),

    // Getting event details
    getEventDetails: builder.query({
      query: ({ id }) => ({
        url: `/events/${id}.json`,
        params: {
          apikey,
        },
        method: "GET",
      }),
    }),
  }),
});

export const { useGetEventsQuery, useGetEventDetailsQuery } = eventsApi;
