import React, { useState } from "react";
import { Button } from "@storybook/react/demo";
import { getPolly } from "storybook-addon-r2request";

export default { title: "Facade api for developing app components upfront" };

export const clickButtonToRequestApi = () => {
  const [state, setState] = useState({ message: null });

  const polly = getPolly();
  polly.server.get("/api/test").intercept((req, res) => {
    res.sendStatus(200);
    res.json({ message: "Hello" });
  });

  async function requestApi() {
    const response = await window.fetch("/api/test");
    console.assert(response.status === 200, "Success request api.");
    const body = await response.json();
    setState({ message: body.message });
  }

  return (
    <React.Fragment>
      <Button onClick={requestApi}>Click me</Button>
      {state.message ? "Server response: " + state.message : null}
    </React.Fragment>
  );
};

export const clickButtonToRequestCorsApi = () => {
  const [state, setState] = useState({ message: null });

  const polly = getPolly();
  polly.server.get("http://example.com/api/test").intercept((req, res) => {
    res.sendStatus(200);
    res.json({ message: "Hello CORS" });
  });

  async function requestApi() {
    const response = await window.fetch("http://example.com/api/test");
    console.assert(response.status === 200, "Success request api.");
    const body = await response.json();
    setState({ message: body.message });
  }

  return (
    <React.Fragment>
      <Button onClick={requestApi}>Click me</Button>
      {state.message ? "Server response: " + state.message : null}
    </React.Fragment>
  );
};


export const clickButtonToRequestHTTPSApi = () => {
  const [state, setState] = useState({ message: null });

  const polly = getPolly();
  polly.server.get("https://example.com/api/test").intercept((req, res) => {
    res.sendStatus(200);
    res.json({ message: "Hello HTTPS" });
  });

  async function requestApi() {
    const response = await window.fetch("https://example.com/api/test");
    console.assert(response.status === 200, "Success request api.");
    const body = await response.json();
    setState({ message: body.message });
  }

  return (
    <React.Fragment>
      <Button onClick={requestApi}>Click me</Button>
      {state.message ? "Server response: " + state.message : null}
    </React.Fragment>
  );
};
