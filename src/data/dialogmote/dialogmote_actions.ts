import { DialogmoteDTO, DialogmoteInnkallingDTO } from "./dialogmoteTypes";

export enum DialogmoteActionTypes {
  OPPRETT_INNKALLING_FORESPURT = "OPPRETT_INNKALLING_FORESPURT",
  OPPRETTER_INNKALLING = "OPPRETTER_INNKALLING",
  INNKALLING_OPPRETTET = "INNKALLING_OPPRETTET",
  OPPRETT_INNKALLING_FEILET = "OPPRETT_INNKALLING_FEILET",
  OPPRETT_INNKALLING_FULLFORT = "OPPRETT_INNKALLING_FULLFORT",
  FETCH_DIALOGMOTE = "FETCH_DIALOGMOTE",
  FETCH_DIALOGMOTE_FAILED = "FETCH_DIALOGMOTE_FAILED",
  FETCH_DIALOGMOTE_SUCCESS = "FETCH_DIALOGMOTE_SUCCESS",
}

export interface OpprettInnkallingAction {
  type: DialogmoteActionTypes.OPPRETT_INNKALLING_FORESPURT;
  fnr: string;
  data: DialogmoteInnkallingDTO;
}

export interface OppretterInnkallingAction {
  type: DialogmoteActionTypes.OPPRETTER_INNKALLING;
}

export interface InnkallingOpprettetAction {
  type: DialogmoteActionTypes.INNKALLING_OPPRETTET;
  data: DialogmoteInnkallingDTO;
}

export interface OpprettInnkallingFeiletAction {
  type: DialogmoteActionTypes.OPPRETT_INNKALLING_FEILET;
}

export interface OpprettInnkallingFullfortAction {
  type: DialogmoteActionTypes.OPPRETT_INNKALLING_FULLFORT;
}

export interface FetchDialogmoteAction {
  type: DialogmoteActionTypes.FETCH_DIALOGMOTE;
  fnr: string;
}
export interface FetchDialogmoteFailedAction {
  type: DialogmoteActionTypes.FETCH_DIALOGMOTE_FAILED;
}
export interface FetchDialogmoteSuccessAction {
  type: DialogmoteActionTypes.FETCH_DIALOGMOTE_SUCCESS;
  dialogmoteDtoList: DialogmoteDTO[];
}

export type DialogmoteActions =
  | OpprettInnkallingAction
  | OppretterInnkallingAction
  | InnkallingOpprettetAction
  | OpprettInnkallingFeiletAction
  | OpprettInnkallingFullfortAction
  | FetchDialogmoteAction
  | FetchDialogmoteFailedAction
  | FetchDialogmoteSuccessAction;

export const opprettInnkalling = (
  fnr: string,
  data: DialogmoteInnkallingDTO
): OpprettInnkallingAction => ({
  type: DialogmoteActionTypes.OPPRETT_INNKALLING_FORESPURT,
  fnr,
  data,
});

export const oppretterInnkalling = (): OppretterInnkallingAction => ({
  type: DialogmoteActionTypes.OPPRETTER_INNKALLING,
});

export const innkallingOpprettet = (
  data: DialogmoteInnkallingDTO
): InnkallingOpprettetAction => ({
  type: DialogmoteActionTypes.INNKALLING_OPPRETTET,
  data,
});

export const opprettInnkallingFeilet = (): OpprettInnkallingFeiletAction => ({
  type: DialogmoteActionTypes.OPPRETT_INNKALLING_FEILET,
});

export const opprettInnkallingFullfort = (): OpprettInnkallingFullfortAction => ({
  type: DialogmoteActionTypes.OPPRETT_INNKALLING_FULLFORT,
});

export const fetchDialogmote = (fnr: string): FetchDialogmoteAction => ({
  type: DialogmoteActionTypes.FETCH_DIALOGMOTE,
  fnr,
});
export const fetchDialogmoteFailed = (): FetchDialogmoteFailedAction => ({
  type: DialogmoteActionTypes.FETCH_DIALOGMOTE_FAILED,
});
export const fetchDialogmoteSuccess = (
  dialogmoteDtoList: DialogmoteDTO[]
): FetchDialogmoteSuccessAction => ({
  type: DialogmoteActionTypes.FETCH_DIALOGMOTE_SUCCESS,
  dialogmoteDtoList,
});