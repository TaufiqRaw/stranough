import path, { join } from "path";
import * as Enums from "./enums";
import dotenv from "dotenv";
import { Cascade, ManyToOneOptions, PropertyOptions } from "@mikro-orm/core";
import { Media } from "./entities";
dotenv.config({
  path: path.join(__dirname, "..", "..", "..", ".env"),
});

export const envPath = path.join(__dirname, "..", "..", "..", ".env");

export const imageSizeLimit = 5 * 1024 * 1024; // 2MB

export const serverPort = process.env.SERVER_PORT || 5000;
export const serverUrl = process.env.SERVER_URL || "http://localhost";
export const serverImagesUrl = process.env.SERVER_IMAGES_URL || "images";

export const serverImageBaseUrl = `${serverUrl}/${serverImagesUrl}/`;

export const imagePath = join(__dirname, "..", "public", serverImagesUrl);


export const errorMessage = Object.freeze({
  404: "Not Found",
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  500: "Internal Server Error",
});

type ImageResolutionConstant = {
  [key in Enums.GuitarPart]: {
    maxWidth?: number;
    maxHeight?: number;
  };
};

export const maxImageResolution: ImageResolutionConstant = Object.freeze({
  body: {
    maxWidth: 1024,
  },
  bridge: {
    maxWidth: 512,
  },
  pickguard: {
    maxWidth: 1024,
  },
  headstock: {
    maxWidth: 512,
  },
  jack: {
    maxHeight: 256,
  },
  knob: {
    maxHeight: 256,
  },
  nut: {
    maxWidth: 512,
  },
  peg: {
    maxHeight: 256,
  },
  switch: {
    maxHeight: 256,
  },
  pickup: {
    maxWidth: 512,
  },
});

export const maxDescriptionLength = 1000;

export const mediaFKOption: Partial<ManyToOneOptions<Media, unknown>> =
  Object.freeze({
    deleteRule: "set null",
    updateRule: "cascade",
    cascade: [Cascade.ALL],
    serializer : v=>v,
  });