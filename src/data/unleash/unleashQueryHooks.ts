import { useVeilederinfoQuery } from "@/data/veilederinfo/veilederinfoQueryHooks";
import { useValgtEnhet } from "@/context/ValgtEnhetContext";
import { post } from "@/api/axios";
import { UNLEASH_ROOT } from "@/apiConstants";
import { ToggleNames, Toggles } from "@/data/unleash/unleash_types";
import { useQuery } from "react-query";

export const unleashQueryKeys = {
  toggles: (valgtEnhet: string, veilederIdent: string) => [
    "toggles",
    valgtEnhet,
    veilederIdent,
  ],
};

export const useFeatureToggles = () => {
  const { data: veilederInfo } = useVeilederinfoQuery();
  const { valgtEnhet } = useValgtEnhet();
  const veilederIdent = veilederInfo?.ident || "";
  const path = `${UNLEASH_ROOT}/toggles?valgtEnhet=${valgtEnhet}${
    veilederIdent ? `&userId=${veilederIdent}` : ""
  }`;
  const fetchToggles = () =>
    post<Toggles>(path, {
      toggles: Object.values(ToggleNames),
    });
  const query = useQuery(
    unleashQueryKeys.toggles(valgtEnhet, veilederIdent),
    fetchToggles,
    {
      enabled: !!valgtEnhet,
    }
  );
  const isFeatureEnabled = (toggle: ToggleNames): boolean => {
    return query.data ? query.data[toggle] : false;
  };

  return {
    ...query,
    isFeatureEnabled,
  };
};