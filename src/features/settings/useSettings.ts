import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";
import type { SettingsFormTypes } from "../../types/settingsFormTypes";

const useSettings = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  // typing the settings data before exporting
  const settings: SettingsFormTypes = data;

  return { settings, isLoading, error };
};

export default useSettings;
