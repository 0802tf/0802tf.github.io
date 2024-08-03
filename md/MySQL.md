# MySQL

Windowsの場合はコマンドプロンプトを管理者として実行

## 環境変数の確認

```bash
mysql --version
```

## 起動

Windows

```bash
net start mysql80
```

Mac

```bash
mysql.server start
```

## ログイン

Windows

```bash
mysql --user=root --password
mysql -u root -p
```

Mac

```bash
mysql -uroot
```

## ログアウト

```sql
exit;
```

## 停止

Windows

```bash
net stop mysql80
```

Mac

```bash
mysql.server stop
```

## SQL

SQL(Structured Query Language)とは、データベースを操作するための言語。
SQLは標準化されており、 ほとんどのデータベースでは標準化されたSQLを使用することが可能

|DB機能|SQLの種類|概要|例|
|-|-|-|-|
|データ定義|DDL(Data Definition Language)|データベースやテーブルの作成・変更・削除|CREATE, ALTER, DROP|
|データ操作|DML|データの検索・追加・更新・削除|SELECT, INSERT, UPDATE, DELETE|
|データ制御|DCL|トランザクションの制御|COMMIT, ROLLBACK|

データ型

|種類|データ型(例)|定義|
|-|-|-|
|文字列 (固定⻑)|CHAR|⻑さが固定の文字列|
|文字列 (可変⻑)|VARCHAR NVARCHAR|最大の⻑さが決まっており、値は可変の文字列|
|整数|LONG INT(INTEGER)|整数|
|小数|NUMERIC|全体桁数と小数桁数が固定の小数|
|浮動小数|NUMBER FLOAT REAL|小数点位置が固定ではない小数|
|日付|DATE TIME TIMESTAMP|日付や時刻を扱う|
|バイナリ|RAW|バイナリデータ(ファイルなど)|

### DDL

CREATE文: データベース・テーブルの作成

```sql
CREATE TABLE テーブル名 ( 列名 列の型(⻑さ) [制約], ... )
```

|制約|内容|
|-|-|
|PRIMARY KEY|「主キー」とする場合に指定|
|FOREIGN KEY|「外部キー」とする場合に指定|
|UNIQUE|重複する値を禁止する場合に指定|
|NOT NULL|値が必ず必要(NULL値を禁止)|

DROP文: データベース・テーブルの削除

```sql
DROP TABLE テーブル名
```

### DML

SELECT文: 検索

```sql
SELECT 項目名 , ... FROM テーブル名 WHERE 条件式
```

INSERT文: 挿入

```sql
INSERT INTO テーブル名 ( 項目名,... ) VALUES ( 値,... )
```

UPDATE文: 更新

```sql
UPDATE テーブル名 SET 項目名 = 値 WHERE 条件式
```

DELETE文: 削除

```sql
DELETE FROM テーブル名 WHERE 条件式
```

### 演算子

|演算|演算子|
|-|-|
|加算|+|
|減算|-|
|乗算|*|
|除算|/|
|除算(余り)|%|
|論理和|OR|
|論理積|AND|
|否定|NOT|
|一致|==|
|不一致|<><br>!=|
|大小関係|<<br>><br><=<br>>=|
|範囲検索|BETWEEN a AND b|
|NULL判定|IS NULL<br>IS NOT NULL|
|あいまい検索|LIKE|
  
### LIKE演算子

「%」「_」と文字列の組み合わせで、あいまい検索を行う

|表記|説明|
|-|-|
|%|0文字以上の任意の文字列|
|_|1文字の任意の文字列|

### 順序指定(ORDER BY句)

```sql
SELECT 項目名 , ... FROM テーブル名 [WHERE 条件式] ORDER BY 項目名 [ASC|DESC]
```

### 重複排除(DISTINCT)

項目名の内容について重複を排除

```sql
SELECT DISTINCT 項目名 FROM テーブル名 [WHERE 条件式]
```

### 集計

項目名ごとに集計関数に従って集計結果を出力

```sql
SELECT 集計関数 FROM テーブル名 [WHERE 条件式] GROUP BY 項目名
```

|集計関数|集計内容|
|-|-|
|COUNT|列のNULLでない値の数<br>ワイルドカード(*)を指定した場合、レコード数|
|SUM|合計|
|MAX|最大|
|MIN|最小|
|AVG|平均|

### 結合

* INNER JOINによる内部結合

```sql
SELECT e.cd, e.name, e.age, d.name AS deptName FROM emp e INNER JOIN dept d ON e.dept = d.no
```

* WHERE句による内部結合

```sql
SELECT e.cd, e.name, e.age, d.name AS deptName FROM emp e, dept d WHERE e.dept = d.no
```

empテーブル

|cd|name|age|dept|
|-|-|-|-|
|001|内田|34|01|
|002|内山田|26|02|
|003|山田|28|02|
|004|田所|39|01|

deptテーブル

|no|name|
|-|-|
|01|開発課|
|02|営業課|
|03|人事課|

結合

|cd|name|age|deptName|
|-|-|-|-|
|001|内田|34|開発課|
|002|内山田|26|営業課|
|003|山田|28|営業課|
|004|田所|39|開発課|

### 副問い合わせ

条件としてSELECT文を書くことができる

(例) 平均年齢より高い年齢の人を出力したい

```sql
SELECT name,age FROM test WHERE age > (SELECT AVG(age) FROM test)
```

testテーブル

|cd|name|age|
|-|-|-|
|001|内田|34|
|002|内山田|26|
|003|山田|28|
|004|田所|39|
