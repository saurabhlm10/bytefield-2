export const lambdaHandler = async (event, context) => {
  try {
    console.log("event.body", event.body);
    if (!event.body) {
      throw new Error("Request body is empty");
    }
    const { code } = JSON.parse(event.body || "");

    if (!code) throw new Error("code is required");

    const result = eval(code);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "successfully executed",
        result,
      }),
    };
  } catch (err) {
    console.log(err);

    const errorMessage = "some error happened";
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: err.message ?? errorMessage,
        error: err,
      }),
    };
  }
};
