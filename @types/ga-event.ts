type GAEVentBase = {
  action: string;
  category: "user_engagement";
  label: "event";
  value?: string;
};

type ResultWonEvent = GAEVentBase & {
  action: "result_won";
};
type ResultLoseEvent = GAEVentBase & {
  action: "result_lose";
};
type UserShareEvent = GAEVentBase & {
  action: "user_share";
};

export type GAEvent = ResultWonEvent | ResultLoseEvent | UserShareEvent;
