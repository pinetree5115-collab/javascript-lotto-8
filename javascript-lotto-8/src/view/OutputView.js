import { Console } from "@woowacourse/mission-utils";
import { OUTPUT_MESSAGES } from "../constants/Messages.js";

const OutputView = {
  printPurchaseCount(count) {
    Console.print(OUTPUT_MESSAGES.PURCHASE_COUNT(count));
  },

  printLottos(lottos) {
    lottos.forEach((lotto) => {
      Console.print(`[${lotto.getNumbers().join(", ")}]`);
    });
  },

  printWinningStatistics(statistics, profitRate) {
    Console.print(OUTPUT_MESSAGES.WINNING_STATISTICS);
    Console.print(OUTPUT_MESSAGES.MATCH_RESULT(3, 5000, statistics[3]));
    Console.print(OUTPUT_MESSAGES.MATCH_RESULT(4, 50000, statistics[4]));
    Console.print(OUTPUT_MESSAGES.MATCH_RESULT(5, 1500000, statistics[5]));
    Console.print(OUTPUT_MESSAGES.BONUS_MATCH_RESULT(5, 30000000, statistics["5+bonus"]));
    Console.print(OUTPUT_MESSAGES.MATCH_RESULT(6, 2000000000, statistics[6]));
    Console.print(OUTPUT_MESSAGES.PROFIT_RATE(profitRate));
  },

  printError(message) {
    Console.print(message);
    throw new Error(message);
  },
};

export default OutputView;