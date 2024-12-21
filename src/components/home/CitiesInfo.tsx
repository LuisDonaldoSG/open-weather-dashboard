import { getInfoByCities } from "actions/home"
import SelectableCitiesAndDetails from "@components/home/SelectableCitiesAndDetails";

export default async function CitiesInfo() {
    const cities = await getInfoByCities();
    return (
        <div className="flex lg:flex-row flex-col gap-16 mt-4 p-8 rounded-lg bg-gray-200 shadow justify-center">
            <SelectableCitiesAndDetails 
                data={cities}
            />
        </div>
    )
}