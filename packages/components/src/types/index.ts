import { Temporal } from "@js-temporal/polyfill";
import { CivilDate, CivilDateTime, CivilTime } from "@std-proposal/temporal";

export type AtlantisTemporalPlainDate = Temporal.PlainDate | CivilDate;
export type AtlantisTemporalPlainDateTime = Temporal.PlainDate | CivilDateTime;
export type AtlantisTemporalPlainTime = Temporal.PlainTime | CivilTime;
