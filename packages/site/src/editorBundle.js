// bundle.js
import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { useFormState } from "@jobber/hooks";

window.React = React;
window.ReactDOM = ReactDOM;

export * from "@jobber/components";

export { React, ReactDOM, useEffect, useRef, useState, useFormState };
