import { Random } from "@woowacourse/mission-utils";
import Lotto from "./Lotto.js";
import { ERROR_MESSAGES } from "../constants/Messages.js";

class LottoMachine {
  #purchaseAmount;
  #lottos;

  constructor(purchaseAmount) {
    this.#validate(purchaseAmount);
    this.#purchaseAmount = purchaseAmount;
    this.#lottos = [];
    this.#generateLottos();
  }

  #validate(amount) {
    if (!Number.isInteger(amount) || amount < 1000) {
      throw new Error(ERROR_MESSAGES.INVALID_AMOUNT);
    }
    if (amount % 1000 !== 0) {
      throw new Error(ERROR_MESSAGES.INVALID_AMOUNT);
    }
  }

  #generateLottos() {
    const count = this.#purchaseAmount / 1000;
    for (let i = 0; i < count; i++) {
      const numbers = Random.pickUniqueNumbersInRange(1, 45, 6);
      this.#lottos.push(new Lotto(numbers));
    }
  }

  getLottos() {
    return this.#lottos;
  }

  getCount() {
    return this.#lottos.length;
  }
}

export default LottoMachine;