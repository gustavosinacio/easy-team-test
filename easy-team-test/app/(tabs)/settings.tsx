import SafeView from "@/components/SafeView";
import { AppContext } from "@/contexts/App/AppContext";
import { patchLocationSettings } from "@/services/locations.service";
import { LocationSettings } from "@/types/locations.types";
import { Settings } from "@easyteam/ui";
import { useContext } from "react";

export default function HomeScreen() {
  const { locationId } = useContext(AppContext);

  async function handleSaveSettings(settings: LocationSettings) {
    await patchLocationSettings(locationId, settings);
  }

  return (
    <SafeView>
      <Settings onSave={handleSaveSettings as any} />
    </SafeView>
  );
}
