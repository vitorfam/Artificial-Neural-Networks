#lang racket

(include "bprog-data")


(define (bipolar-sigmoid x)
  (- (/ 2 (+ 1 (exp (* -1 x)))) 1))

(define (bipolar-sigmoid-d x)
  (* 0.5
     (+ 1 (bipolar-sigmoid x))
     (- 1 (bipolar-sigmoid x))))


;;Transforma a lista de pesos vij em uma lista só:
(define (multi->one ls)
  (let loop [(in ls)
             (a '())
             (b '())]
    (cond [(null? in) (flatten (list (reverse a) (reverse b)))]
          [(null? (cdr in)) (loop (cdr in) (cons (caar in) a) (cons (cadar in) b))]
          [else (loop (cdr in) (cons (caar in) a) (cons (caadr in) b))])))

;;Transforma uma lista de pesos em lista de pares:
(define (one->multi ls)
  (let-values ([(v1 v2) (split-at ls 4)])
    (make-pair-list v1 v2)))

;;z_inj: sinal de entrada já pesado numa célula da camada oculta.
;;xi:    lista das entradas x.
;;v0j:   bias da célula na camada oculta.
;;vji:   lista 
(define (z_inj v0j xi vij)
  (+ v0j (apply + (map (lambda(x y) (* x y)) xi vij))))

;;Entrada de todas as células da camada oculta.
(define (z_inj* v0j xi vij)
  (map (lambda(x y) (z_inj x xi y)) v0j vij))

;;zj: SAÍDA DE CADA CÉLULA DA CAMADA OCULTA.
;;Aplica a função sigmoide bipolar para encontrar a saída
;;de cada neurônio z_{j}
;;z_{j} = f(z\_in_{j}), onde f é a função sigmóide bipolar.
(define (zj z_inj)
  (bipolar-sigmoid z_inj))

;;Saída para todas as células da camada oculta.
(define (zj* z_inj-all)
  (map (lambda(x) (zj x)) z_inj-all))
;;> (zj* (z_inj* v0j (car t-pairs) vij))

;;y_ink :sinal de entrada já pesado numa célula da camada de saída.
(define (y_ink w0k zj wjk)
  (+ w0k (apply + (map (lambda(x y) (* x y)) zj wjk))))
;;> (y_ink w0k (zj* (z_inj* v0j (car t-pairs) vij)) wjk)

;;yk: SAÍDA DE CADA CÉLULA DA CAMADA DE SAÍDA.
(define (yk y_ink)
  (bipolar-sigmoid y_ink))
;;> (yk (y_ink w0k (zj* (z_inj* v0j (car t-pairs) vij)) wjk))

;;dk: erro de cada célula da camada de saída.
;;tk: resposta esperada na saída.
;;yk: saída da célula
;;y_ink: entrada na célula.
(define (dk tk yk y_ink)
  (* (- tk yk) (bipolar-sigmoid-d y_ink)))
;;> (dk -1 (yk (y_ink w0k (zj* (z_inj* v0j (car t-pairs) vij)) wjk)) (y_ink w0k (zj* (z_inj* v0j (car t-pairs) vij)) wjk))

;;Dwjk: correção para cada peso entre oculta e saída.
;;lr: learning rate (0.02)
;;dk: erro de cada célula da camada de saída.
;;zj: entrada em cada célula da camada de sáida.
(define (Dwjk lr dk zj)
  (* lr dk zj))

(define delta-k (dk (car targets) (yk (y_ink w0k (zj* (z_inj* v0j (car t-pairs) vij)) wjk)) (y_ink w0k (zj* (z_inj* v0j (car t-pairs) vij)) wjk)))
;;> (Dwjk 0.02 delta-k (car (zj* (z_inj* v0j (car t-pairs) vij))))

;;Todas as correções de pesos wjk:
(define (Dwjk* lr dk zj-all)
  (map (lambda(x) (Dwjk lr dk x)) zj-all))
;;(define delta-k (dk -1 (yk (y_ink w0k (zj* (z_inj* v0j (car t-pairs) vij)) wjk)) (y_ink w0k (zj* (z_inj* v0j (car t-pairs) vij)) wjk)))
(define zjall (zj* (z_inj* v0j (car t-pairs) vij)))
;;> (Dwjk* 0.02 delta-k zjall)

;;Dw0k: correção para cada bias da camada de saída:
(define (Dw0k lr dk)
  (* lr dk))
;;> (Dw0k 0.02 delta-k)

;;dj: erro para cada peso entre entrada e oculta.
(define (d_inj dk wjk)
  (map (lambda(x) (* x dk)) wjk))

(define (dj d_inj z_inj)
  (* d_inj (bipolar-sigmoid-d z_inj)))

;dj*: todos os erros entre entrada e oculta.
(define (dj* d_inj-all z_inj-all)
  (map (lambda(x y) (dj x y)) d_inj-all z_inj-all))
;;> (dj* (d_inj delta-k wjk) (z_inj* v0j (car t-pairs) vij))
(define djall (dj* (d_inj delta-k wjk) (z_inj* v0j (car t-pairs) vij)))

;;Dvij: Correção dos pesos entre entrada e oculta:
(define (Dvij lr dj xi)
  (* lr dj xi))

(define (Dvij-1 lr dj-all xi)
  (map (lambda(x) (Dvij lr x xi)) dj-all))

(define (Dvij* lr dj-all xi)
  (map (lambda(x) (Dvij-1 lr dj-all x)) xi))
(define dvijall (Dvij* lr djall (car t-pairs)))

;;> (define djall (dj* (d_inj delta-k wjk) (z_inj* v0j (car t-pairs) vij)))
;;> (Dvij* 0.02 djall (car t-pairs)))

;;Correção para as biases v0j
(define (Dv0j lr dj)
  (* lr dj))

(define (Dv0j* lr dj-all)
  (map (lambda(x) (Dv0j lr x)) dj-all))
(define dv0j (Dv0j* lr djall))

;;Atualização dos pesos:
(define (wjknew wjkold Dwjk)
  (+ wjkold Dwjk))

(define (wjknew* wjkold-all Dwjk-all)
  (map (lambda(x y) (wjknew x y)) wjkold-all Dwjk-all))
(define dwjkall (Dwjk* lr delta-k zjall))

;;Atualização da bias w0k:
(define (w0knew w0k Dwjk)
  (+ w0k Dwjk))

(define (vijnew vijold Dvij)
  (+ vijold Dvij))

;;(define (vijnew* vijold-all Dvij-all)
;;  (map (lambda(x y) (vijnew x y)) vijold-all Dvij-all))

(define (vijnew* vijold-all Dvij-all)
  (make-pair-list
   (map (lambda(x y) (vijnew (car x) y)) vijold-all (car Dvij-all))
   (map (lambda(x y) (vijnew (cadr x) y)) vijold-all (cadr Dvij-all))))

;;Atualização das biases v0j:
(define (v0jnew* v0jold Dv0j)
  (map (lambda(x y) (+ x y)) v0jold Dv0j))

;;Erro quadrático:
(define (eq ti yi)
  (* 0.5 (expt (- ti yi) 2)))

(define (cicle VIJ V0J WJK W0K)
  (let loop [(xi t-pairs)
             (tk targets)
             (Vij VIJ)
             (V0j V0J)
             (Wjk WJK)
             (W0k W0K)]
    (cond [(null? xi) (list Vij V0j Wjk W0k)]
          [else (loop (cdr xi)
                      (cdr tk)
                      (vijnew* Vij (Dvij* lr (dj* (d_inj (dk (car tk) (yk (y_ink W0k (zj* (z_inj* V0j (car xi) Vij)) Wjk)) (y_ink W0k (zj* (z_inj* V0j (car xi) Vij)) Wjk)) Wjk) (z_inj* V0j (car xi) Vij)) (car xi)))
                      (v0jnew* V0j (Dv0j* lr (dj* (d_inj (dk (car tk) (yk (y_ink W0k (zj* (z_inj* V0j (car xi) Vij)) Wjk)) (y_ink W0k (zj* (z_inj* V0j (car xi) Vij)) Wjk)) Wjk) (z_inj* V0j (car xi) Vij))))
                      (wjknew* Wjk (Dwjk* lr (dk (car tk) (yk (y_ink W0k (zj* (z_inj* V0j (car xi) Vij)) Wjk)) (y_ink W0k (zj* (z_inj* V0j (car xi) Vij)) Wjk)) (zj* (z_inj* V0j (car xi) Vij))))
                      (w0knew W0k (Dw0k lr (dk (car tk) (yk (y_ink W0k (zj* (z_inj* V0j (car xi) Vij)) Wjk)) (y_ink W0k (zj* (z_inj* V0j (car xi) Vij)) Wjk)))))])))

(define (treinar n VIJ V0J WJK W0K)
  (let loop [(m n)
             (Vij VIJ)
             (V0j V0J)
             (Wjk WJK)
             (W0k W0K)]
    (cond [(zero? m) (list Vij V0j Wjk W0k)]
          [else (loop (- m 1)
                      (car    (cicle Vij V0j Wjk W0k))
                      (cadr   (cicle Vij V0j Wjk W0k))
                      (caddr  (cicle Vij V0j Wjk W0k))
                      (cadddr (cicle Vij V0j Wjk W0k)))])))


;;Depois do treinamento:
(define train-data (treinar 1000 vij v0j wjk w0k))
(define train-rdata (treinar 1000 rvij v0j rwjk w0k))

(define tvij (car train-data))
(define tv0j (cadr train-data))
(define twjk (caddr train-data))
(define tw0k (cadddr train-data))

(define rtvij (car train-rdata))
(define rtv0j (cadr train-rdata))
(define rtwjk (caddr train-rdata))
(define rtw0k (cadddr train-rdata))

(define (t-z_inj v0j-t xi vij-t)
  (+ v0j-t (apply + (map (lambda(x y) (* x y)) xi vij-t))))

(define (t-zj z_inj-t)
  (bipolar-sigmoid z_inj-t))

(define (t-zj* z_inj-all-t)
  (map (lambda(x) (zj x)) z_inj-all-t))

(define (resposta x)
  (if (< x 0) -1 1))

(define (teste inputs)
  (map (lambda(r) (resposta (yk (y_ink tw0k (t-zj* (z_inj* tv0j r tvij)) twjk)))) inputs))

(define (rteste inputs)
  (map (lambda(r) (resposta (yk (y_ink rtw0k (t-zj* (z_inj* rtv0j r rtvij)) rtwjk)))) inputs))