const url =
  process.env.NODE_ENV == "production"
    ? "https://serverless2-liart.vercel.app"
    : "http://localhost:5500";

export const fetch2 = async (api, body) => {
  const res = await fetch(`${url}${api}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
    body: JSON.stringify(body),
  });
  return await res.json();
};
export const fetch11 = async (api, body) => {
  const res = await fetch(`${url}${api}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return await res.json();
};

export const fetch3 = async (api, type) => {
  const res = await fetch(`${url}${api}`, {
    method: type,
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
  });
  return await res.json();
};
