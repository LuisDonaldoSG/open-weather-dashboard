import Search from "@components/common/Search";
import CitiesInfo from "@components/home/CitiesInfo";
import { HomeI } from "@interfaces/props";

export default async function Home(props: { searchParams?: Promise<HomeI> }) {
    
    const searchParams = await props.searchParams as HomeI;

    return (
        <div className='flex flex-col justify-center py-2 w-full'>
            <Search />
            <CitiesInfo {...searchParams}/>
        </div>
    );
}
