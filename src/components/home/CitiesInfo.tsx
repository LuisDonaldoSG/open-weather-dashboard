import { getInfoByCities } from "actions/home"
import SelectableCitiesAndDetails from "@components/home/SelectableCitiesAndDetails";
import { HomeI } from "@interfaces/props";

export default async function CitiesInfo({ cityId }: HomeI) {

    const cities = await getInfoByCities(cityId);

    return (
        <div className="flex lg:flex-row flex-col gap-16 mt-4 p-8 rounded-lg bg-gray-200 shadow justify-center items-center">
            <SelectableCitiesAndDetails
                data={cities}
            />
        </div>
    )
}