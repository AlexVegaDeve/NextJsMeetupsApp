import { useRouter } from 'next/router';
import { getFilteredEvents } from '../../dummy-data';
import EventList from '../../components/events/event-list';

function FilteredEventsPage() {
    const router = useRouter();
    const filterData = router.query.slug;
    if (!filterData){
        return<p className="center">Loading...</p>
    }
    const filteredYear = filterData[0];
    const filteredMonth = filterData[1];
    const numYear = +filteredYear;
    const numMonth = +filteredMonth;

    if (
        isNaN(numYear) ||
        isNaN(numMonth) ||
        numYear > 2030 ||
        numYear < 2021 ||
        numMonth < 1 ||
        numMonth > 12
    ) {
        return <p>Invalid Filter. Please adjust your values!</p>
    }
    const events = getFilteredEvents({year: numYear, month: numMonth});

    if (!events || events.length === 0) {
        return <p>No events found for the selected filters. Please adjust your filter.</p>
    }

    return ( 
        <div>
            <EventList items={events} />
        </div>
     );
}

export default FilteredEventsPage;