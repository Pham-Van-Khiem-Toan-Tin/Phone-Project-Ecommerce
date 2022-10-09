import DateTimeDisplay from "./DateAndTimeDisplay";
const ShowCounter = ({ days, hours, minutes, seconds }) => {
    return (
      <div className="show-counter">
        <a
          href="https://tapasadhikary.com"
          target="_blank"
          rel="noopener noreferrer"
          className="countdown-link d-flex flex-row"
        >
          <DateTimeDisplay value={days} type={'Days'} isDanger={days <= 3} />
          <p className="mb-0 mt-2">:</p>
          <DateTimeDisplay value={hours} type={'Hours'} isDanger={false} />
          <p className="mb-0 mt-2">:</p>
          <DateTimeDisplay value={minutes} type={'Mins'} isDanger={false} />
          <p className="mb-0 mt-2">:</p>
          <DateTimeDisplay value={seconds} type={'Seconds'} isDanger={false} />
        </a>
      </div>
    );
  };
export default ShowCounter;