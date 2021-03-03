import _ from 'lodash';

const genDiff = (file1, file2) => {
  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);
  const sortedUniqueKeyes = _.sortBy(
    _.uniq([...Object.keys(file1), ...Object.keys(file2)]),
  );

  const diff = sortedUniqueKeyes.reduce((acc, curerentValue) => {
    const keyIsChanged = keys1.includes(curerentValue) && keys2.includes(curerentValue);
    const keyIsRemoved = keys1.includes(curerentValue) && !keys2.includes(curerentValue);
    const keyIsAdd = !keys1.includes(curerentValue) && keys2.includes(curerentValue);

    if (keyIsChanged) {
      if (file1[curerentValue] !== file2[curerentValue]) {
        acc.push(`  - ${curerentValue} : ${file1[curerentValue]}`);
        acc.push(`  + ${curerentValue} : ${file2[curerentValue]}`);
      } else {
        acc.push(`    ${curerentValue} : ${file2[curerentValue]}`);
      }
    }

    if (keyIsRemoved) {
      acc.push(`  - ${curerentValue} : ${file1[curerentValue]}`);
    }

    if (keyIsAdd) {
      acc.push(`  + ${curerentValue} : ${file2[curerentValue]}`);
    }

    return acc;
  }, []);

  return `{\n${diff.join('\n')}\n}`;
};

export default genDiff;
