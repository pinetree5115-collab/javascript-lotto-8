export const ERROR_MESSAGES = {
  INVALID_NUMBER: "[ERROR] 숫자가 아닙니다.",
  INVALID_AMOUNT: "[ERROR] 구입 금액은 1,000원 단위로 입력해야 합니다.",
  INVALID_LOTTO_NUMBERS: "[ERROR] 로또 번호는 1부터 45 사이의 숫자여야 합니다.",
  DUPLICATE_LOTTO_NUMBERS: "[ERROR] 로또 번호에 중복된 숫자가 있습니다.",
  INVALID_BONUS_NUMBER: "[ERROR] 보너스 번호는 1부터 45 사이의 숫자여야 합니다.",
  DUPLICATE_BONUS_NUMBER: "[ERROR] 보너스 번호는 당첨 번호와 중복될 수 없습니다.",
};

export const INPUT_MESSAGES = {
  PURCHASE_AMOUNT: "\n구입금액을 입력해 주세요.\n",
  WINNING_NUMBERS: "\n당첨 번호를 입력해 주세요.\n",
  BONUS_NUMBER: "\n보너스 번호를 입력해 주세요.\n",
};

export const OUTPUT_MESSAGES = {
  PURCHASE_COUNT: (count) => `\n${count}개를 구매했습니다.`,
  WINNING_STATISTICS: "\n당첨 통계\n---",
  MATCH_RESULT: (match, prize, count) => `${match}개 일치 (${prize.toLocaleString()}원) - ${count}개`,
  BONUS_MATCH_RESULT: (match, prize, count) => `${match}개 일치, 보너스 볼 일치 (${prize.toLocaleString()}원) - ${count}개`,
  PROFIT_RATE: (rate) => `총 수익률은 ${rate}%입니다.`,
};