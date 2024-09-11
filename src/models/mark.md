
## 9.1 introduction to Probability
**Definition**
A **sample space** is the set of all possible outcomes of a random process or experiment. An **event** is a subset of a sample space.

### Equally likely probability formula
If $S$ is a finite sample space in which all outcomes are equally likely and E is an event in S, then the **probability of E**, denoted **$P(E)$**, is
$$
P(E)= \frac{\textbf{the number of outcomes in}\;E}{\textbf{the total number of outcomes in}\; S}
$$
**Notation**
For any finite set $A, N(A)$ denotes the number of elements in $A$.

$$
P(E) = \frac{N(E)}{N(S)}
$$
## 9.2 Possibility Trees and the Multiplication rule
**Theorem 9.2.1 The Multiplication rule**
If an operation consists of $k$ steps and 
	the first step can be performed in $n_{1}$ ways, 
	the second step can be performed in $n_{2}$ ways *regardless of how the first step was performed*,
	the $k$th step can be performed in $n_{k}$ ways *regardless of how the preceding steps were performed, 
	then the entire operation can be performed in $n_{1}n_{2}...n_{k}$ ways.

**Theorem 9.2.2**
For any integer $n$ with $n >= 1$, the number of permutations of a set with $n$ elements is $n!$.

**Definition**
An **$r$-permutation** of a set of $n$ elements is an ordered selection of $r$ elements taken from the set of $n$ elements. The number of **$r$-permutations** of a set of $n$ elements is denoted **$P(n, r)$**.

**Theorem 9.2.3**
if $n$ and $r$ are integers and $1 <= r <= n$, then the number of $r$-permutations of a set of $n$ elements is given by the formula
$$P(n,r)=n(n-1)(n-2)...(n-r+1)$$
or, equivalently,
$$P(n,r)=\frac{n!}{(n-r)!}$$
## 9.3 Counting elements of Disjoint Sets: The Addition rule

**Theorem 9.3.1 The Addition rule**
Suppose a finite set $A$ equals the union of $k$ distinct mutually disjoint subsets $A_{1}, A_{2},...,A_{k}$ Then
$$N(A)=N(A_{1})+N(A_{2})+...+N(A_{k})$$
This rule states that the number of elements in a union of mutually disjoint finite sets equals the sum of the number of elements in each of the component sets.

**Theorem 9.3.2 The Difference rule**
if $A$ is a finite set and $B$ is a subset of $A$, then
$$N(A-B)=N(A)-N(B)$$
**Theorem 9.3.3 The inclusion/exclusion rule for Two or Three Sets**
If $A, B$, and $C$ are any finite sets, then
$$N(A \cup B)=N(A)+N(B)-N(A\cap B)$$
and
$$N(A\cup B \cup C)=N(A)+N(B)+N(C)-N(A\cap B)-N(A\cap C)- N(b\cap C)+ N(A\cap B \cap C)$$
## 9.4 The Pigeonhole Principle
**Pigeonhole Principle**: A function from one finite set to a smaller finite set cannot be one-to-one: There must be at least two elements in the domain that have the same image in the co-domain.

**Generalized Pigeonhole Principle**
For any function $f$ from a finite set $X$ with $n$ elements to a finite set $Y$ with $m$ elements and for any positive integer $k$, if $km$ , $n$, then there is some $y \in Y$  such that $y$ is the image of at least $k+1$ distinct elements of $X$.

**Generalized Pigeonhole Principle (Contrapositive Form)**
For any function $f$ from a finite set $X$ with $n$ elements to a finite set $Y$ with $m$ elements and for any positive integer $k$, if for each $y \in Y, f^{-1} (y)$ has at most $k$ elements, then $X$ has at most $km$ elements; in other words, $n <= km$.

**Theorem 9.4.1 The Pigeonhole Principle**
For any function $f$ from a finite set $X$ with $n$ elements to a finite set $Y$ with $m$ elements, if $n > m$, then $f$ is not one-to-one.
**Proof**
Suppose $f$ is any function from a finite set $X$ with $n$ elements to a finite set $Y$ with $m$ elements where $n > m$. Denote the elements of $Y$ by $y_{1},y_{2},...,y_{m}$. Recall that for each $y_{i}$ in $Y$, the inverse image set $f^{-1}(y_{i})={x \in X |f(x)=y_{i}}$ . Now consider the collection of all the inverse image sets for all the elements of $Y$:
$$f^{-1}(y_{1}),f^{-1}(y_{2}),...,f^{-1}(y_{m})$$
By definition of function, each element of $X$ is sent by $f$ to some element of $Y$. Hence each element of $X$ is in one of the inverse image sets, and so the union of all these sets equals $X$. But also, by definition of function, no element of $X$ is sent by $f$ to more than one element of $Y$. Thus each element of $X$ is in only one of the inverse image sets, and so the inverse image sets are mutually disjoint. By the addition rule, therefore,
$$N(X)=N(f^{-1}(y_{1}))+N(f^{-1}(y_{2}))+...+N(f^{-1}(y_{m}))$$
Now suppose that $f$ is one-to-one which is the opposite of what we want to prove. Then each set $f^{-1}(y_{i})$ has at most one element, and so
$$N(f^{-1}(y_{1}))+N(f^{-1}(y_{2}))+...+N(f^{-1}(y_{m}))<=1+1+...+1=m$$
Putting equations (9.4.1) and (9.4.2) together gives that
$$n=N(X)<=m=N(Y)$$
This contradicts the fact that $n > m$, and so the supposition that $f$ is one-to-one must be false. Hence $f$ is not one-to-one as was to be shown.
## 9.5 Counting Subsets of a Set: Combinations
**Definition** $r$-**combination**
Let $n$ and $r$ be nonnegative integers with $r <= n$. An $r$-combination of a set of $n$ elements is a subset of $r$ of the $n$ elements.

**Notation $(\frac{n}{r})$**
The symbol $(\frac{n}{r})$, read “$n$ choose $r$,” denotes the number of subsets of size $r$ (or $r$-combinations) that can be formed from a set of $n$ elements.

**Theorem 9.5.1 Computational Formula for $(\frac{n}{r})$**
The number of subsets of size $r$ (or $r$-combinations) that can be chosen from a set of $n$ elements, $(\frac{n}{r})$, is given by the formula
$$(\frac{n}{r})=\frac{P(n,r)}{r!}$$
or equivalently,
$$(\frac{n}{r})=\frac{n!}{r!(n-r)!}$$
where $n$ and $r$ are nonnegative integers with $r <= n$.

**Theorem 9.5.2 Permutations with Sets of indistinguishable Objects**
Suppose a collection consists of $n$ objects of which
	$n_{1}$ are of type 1 and are indistinguishable from each other 
	$n_{2}$ are of type 2 and are indistinguishable from each other 
	... 
	$n_{k}$ are of type $k$ and are indistinguishable from each other,
and suppose that $n_{1}+n_{2}+...+n_{k}=n$ Then the number of distinguishable permutations of the $n$ objects is
$$(\frac{n}{n_{1}})(\frac{n-n_{1}}{n_{2}})(\frac{n-n_{1}-n_{2}}{n_{3}})...(\frac{n-n_{1}-n_{2}-...-n_{k-1}}{n_{k}})$$
$$= \frac{n!}{n_{1}!n_{2}!n_{3}!...n_{k!}}$$

## Excersises
### 9.2.7
7.  One urn contains one blue ball (labeled B1) and three red balls (labeled R1, R2, and R3). A second urn contains two red balls (R4 and R5) and two blue balls (B2 and B3). An experiment is performed in which one of the two urns is chosen at random and then two balls are randomly chosen from it, one after the other without replacement.
![[DMAT_Opg_9.2.7.excalidraw]]
## 9.2.5
In a competition between players X and Y, the first player to win three games in a row or a total of four games wins. How many ways can the competition be played if X wins the first game and Y wins the second and third games? (Draw a tree.)
![[9-2-5.excalidraw]]
## 9.2.10
Suppose there are three routes from North Point to Boulder Creek, two routes from Boulder Creek to Beaver Dam, two routes from Beaver Dam to Star Lake, and four routes directly from Boulder Creek to Star Lake. (Draw a sketch.) 
	a. How many routes from North Point to Star Lake pass through Beaver Dam? = 12
	b. How many routes from North Point to Star Lake bypass Beaver Dam? = 12
![[9-2-10.excalidraw]]
## 9.2.15
A combination lock requires three selections of numbers, each from 1 through 30.
A: $30^{3}=27.000$
B: $\frac{30!}{3!(30-3)!}=4060$
## 9.2.21

Suppose A is a set with m elements and B is a set with n elements. 
	a. How many relations are there from A to B? Explain. 
	b. How many functions are there from A to B? Explain

