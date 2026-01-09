import InputView from "../view/InputView.js";
import OutputView from "../view/OutputView.js";
import LottoMachine from "../model/LottoMachine.js";
import Lotto from "../model/Lotto.js";
import { ERROR_MESSAGES } from "../constants/Messages.js";

class LottoController {
  #lottoMachine;
  #winningNumbers;
  #bonusNumber;

  async start() {
    try {
      await this.#purchaseLottos();
      await this.#inputWinningNumbers();
      await this.#inputBonusNumber();
      this.#calculateAndPrintResults();
    } catch (error) {
      OutputView.printError(error.message);
    }
  }

  async #purchaseLottos() {
    const amount = await InputView.readPurchaseAmount();
    this.#lottoMachine = new LottoMachine(amount);
    OutputView.printPurchaseCount(this.#lottoMachine.getCount());
    OutputView.printLottos(this.#lottoMachine.getLottos());
  }

  async #inputWinningNumbers() {
    const numbers = await InputView.readWinningNumbers();
    this.#validateWinningNumbers(numbers);
    this.#winningNumbers = new Lotto(numbers);
  }

  async #inputBonusNumber() {
    const bonusNumber = await InputView.readBonusNumber();
    this.#validateBonusNumber(bonusNumber);
    this.#bonusNumber = bonusNumber;
  }

  #validateWinningNumbers(numbers) {
    if (numbers.some((num) => num < 1 || num > 45)) {
      throw new Error(ERROR_MESSAGES.INVALID_LOTTO_NUMBERS);
    }
  }

  #validateBonusNumber(bonusNumber) {
    if (bonusNumber < 1 || bonusNumber > 45) {
      throw new Error(ERROR_MESSAGES.INVALID_BONUS_NUMBER);
    }
    if (this.#winningNumbers.getNumbers().includes(bonusNumber)) {
      throw new Error(ERROR_MESSAGES.DUPLICATE_BONUS_NUMBER);
    }
  }

  #calculateAndPrintResults() {
    const statistics = this.#calculateStatistics();
    const profitRate = this.#calculateProfitRate(statistics);
    OutputView.printWinningStatistics(statistics, profitRate);
  }

  #calculateStatistics() {
    const statistics = { 3: 0, 4: 0, 5: 0, "5+bonus": 0, 6: 0 };
    const lottos = this.#lottoMachine.getLottos();

    lottos.forEach((lotto) => {
      const matchCount = lotto.countMatch(this.#winningNumbers.getNumbers());
      const hasBonus = lotto.getNumbers().includes(this.#bonusNumber);

      if (matchCount === 3) statistics[3]++;
      if (matchCount === 4) statistics[4]++;
      if (matchCount === 5 && !hasBonus) statistics[5]++;
      if (matchCount === 5 && hasBonus) statistics["5+bonus"]++;
      if (matchCount === 6) statistics[6]++;
    });

    return statistics;
  }

  #calculateProfitRate(statistics) {
    const totalPrize =
      statistics[3] * 5000 +
      statistics[4] * 50000 +
      statistics[5] * 1500000 +
      statistics["5+bonus"] * 30000000 +
      statistics[6] * 2000000000;

    const purchaseAmount = this.#lottoMachine.getCount() * 1000;
    const rate = (totalPrize / purchaseAmount) * 100;
    return Math.round(rate * 10) / 10; // 소수점 둘째 자리에서 반올림
  }
}

export default LottoController;