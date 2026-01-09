import { Console } from "@woowacourse/mission-utils";
import { INPUT_MESSAGES } from "../constants/Messages.js";

const InputView = {
  async readPurchaseAmount() {
    const input = await Console.readLineAsync(INPUT_MESSAGES.PURCHASE_AMOUNT);
    return Number(input);
  },

  async readWinningNumbers() {
    const input = await Console.readLineAsync(INPUT_MESSAGES.WINNING_NUMBERS);
    return input.split(",").map((num) => Number(num.trim()));
  },

  async readBonusNumber() {
    const input = await Console.readLineAsync(INPUT_MESSAGES.BONUS_NUMBER);
    return Number(input);
  },
};

export default InputView;