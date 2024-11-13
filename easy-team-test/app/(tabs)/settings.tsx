import SafeView from "@/components/SafeView";
import { AppContext } from "@/contexts/App/AppContext";
import { patchLocationSettings } from "@/services/locations.service";
import { LocationSettings } from "@/types/locations.types";
import { Settings } from "@easyteam/ui";
import { useCallback, useContext } from "react";

export default function SettingsScreen() {
  const { locationId } = useContext(AppContext);

  const handleSaveSettings = useCallback(
    async (settings: LocationSettings) => {
      await patchLocationSettings(locationId, settings);
    },
    [locationId]
  );

  return (
    <SafeView>
      <Settings onSave={handleSaveSettings as any} />
    </SafeView>
  );
}
