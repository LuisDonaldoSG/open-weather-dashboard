import Search from "@components/common/Search";
import CitiesInfo from "@components/home/CitiesInfo";

export default function Home() {
    return (
        <div className='flex flex-col justify-center py-2 w-full'>
            <Search />

            <CitiesInfo />
        </div>
    );
}
