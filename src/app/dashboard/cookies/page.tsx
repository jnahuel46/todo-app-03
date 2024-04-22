import { TabBar } from "../../components/TabBar";
import { cookies } from "next/headers";

export const metadata = {
  title: "Cookies",
  description: "Cookies Page",
};

export default function NamePage() {

  const cookiesStore = cookies();
  const cookiesTab = cookiesStore.get("selected-tab")?.value ?? '1';

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div className="flex flex-col">
        <span className="text-3xl mb-2">Tabs</span>
        <TabBar currentTab={+cookiesTab} />
      </div>
    </div>
  );
}
