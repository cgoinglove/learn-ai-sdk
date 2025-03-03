import { ollama } from 'ollama-ai-provider';
import { generateText } from 'ai';
import chalk from 'chalk';

(async () => {
  const problem =
    '민수는 사과 5개를 가지고 있었습니다. 친구에게 2개를 주었고, 슈퍼마켓에서 3개를 더 샀습니다. 민수는 현재 몇 개의 사과를 가지고 있을까요?';

  // Non-COT 프롬프트 - 단순히 문제만 제시
  const nonCotPrompt = problem;

  // COT 프롬프트 - 단계별 사고 과정을 요청
  const cotPrompt = `
다음 문제를 단계별로 생각하면서 풀어주세요. 각 단계에서의 사고 과정을 "생각:"으로 시작하여 자세히 보여주고, 
최종 답변을 "답변:"으로 시작하여 제공해주세요.

${problem}
`;

  // Non-COT 테스트
  console.log(chalk.bgBlue.white('\n===== Non-COT 테스트 ====='));
  console.log(chalk.yellow('질문:'));
  console.log(nonCotPrompt);

  try {
    const nonCotResult = await generateText({
      model: ollama('llama3.1:8b'),
      prompt: nonCotPrompt,
    });

    console.log(chalk.green('\n응답:'));
    console.log(nonCotResult.text);
  } catch (error) {
    console.error(chalk.red('Non-COT 테스트 오류:'), error);
  }

  // COT 테스트
  console.log(chalk.bgMagenta.white('\n\n===== COT 테스트 ====='));
  console.log(chalk.yellow('질문:'));
  console.log(cotPrompt);

  try {
    const cotResult = await generateText({
      model: ollama('llama3.1:8b'),
      prompt: cotPrompt,
    });

    console.log(chalk.green('\n응답:'));
    console.log(cotResult.text);
  } catch (error) {
    console.error(chalk.red('COT 테스트 오류:'), error);
  }
})();
