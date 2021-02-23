function addUsage(timestamp, nextTimestamp) {
  return nextTimestamp - timestamp;
}
function stateIsAutoOff(state) {
  return state === "auto-off";
}

function stateIsOff(state) {
  return state === "off";
}

function stateChanged(state, newState) {
  return isOff(state) !== isOff(newState);
}

function isOff(state) {
  return stateIsOff(state) || stateIsAutoOff(state);
}

function dayIsAfterLatestEvent(dayStartTs, lastEventTs) {
  return dayStartTs > lastEventTs;
}

const getDayInitialState = (
  allEvents,
  dayEvents,
  dayStartTimestamp,
  monthInitialState
) => {
  const lastEventTimeStamp = allEvents.length
    ? allEvents[allEvents.length - 1].timestamp
    : undefined;

  const firstEventIndex = dayEvents.length
    ? allEvents.findIndex((event) => dayEvents[0].timestamp === event.timestamp)
    : dayIsAfterLatestEvent(dayStartTimestamp, lastEventTimeStamp)
    ? allEvents.length
    : undefined;

  return !firstEventIndex || firstEventIndex <= 0
    ? monthInitialState
    : allEvents[firstEventIndex - 1].state;
};

const checkError = (day) => {
  if (!isInteger(day)) {
    throw "/must be an integer/";
  }
  if (dayOutOfRange(day)) {
    throw "/day out of range/";
  }
};

const isInteger = (number) => Number.isInteger(number);
const dayOutOfRange = (day) => day <= 0 || day >= 365;

module.exports = {
  addUsage,
  stateChanged,
  getDayInitialState,
  checkError,
};
