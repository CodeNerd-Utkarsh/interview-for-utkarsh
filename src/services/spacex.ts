export async function getLaunches({ page = 1, limit = 12 }) {
  try {
    const response = await fetch(
      "https://api.spacexdata.com/v5/launches/query",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: {},
          options: {
            page,
            limit,
            sort: {
              flight_number: "desc",
            },
            populate: ["rocket", "launchpad", "payloads"],
          },
        }),
      }
    );

    if (!response.ok) {
      console.error("Failed to fetch launches:", response.statusText);
      return {
        docs: [],
        totalDocs: 0,
        limit,
        totalPages: 0,
        page,
        pagingCounter: 0,
        hasPrevPage: false,
        hasNextPage: false,
        prevPage: null,
        nextPage: null,
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("An error occurred while fetching launches:", error);
    return {
      docs: [],
      totalDocs: 0,
      limit,
      totalPages: 0,
      page,
      pagingCounter: 0,
      hasPrevPage: false,
      hasNextPage: false,
      prevPage: null,
      nextPage: null,
    };
  }
}
