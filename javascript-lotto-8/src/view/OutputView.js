import { Console } from "@woowacourse/mission-utils";

const OutputView = {
  printPurchaseResult(money) {
    Console.print(`\n${money}원어치 로또를 구매했습니다.`);
  },

  printLottos(lottos) {
    Console.print(`\n${lottos.length}개를 구매했습니다.`);
  },

  printError(message) {
    Console.print(message);
  },
};

export default OutputView;