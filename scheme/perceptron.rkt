#lang racket
;;Perceptron

(define *alpha* 0.09230213122301982308912380912083918092308912380921089)
(define *weights* '(0 0 0 0))
(define *b* 0)
(define *theta* 0)
(define *inputs* '((1 1 1 1) (-1 1 -1 -1) (1 1 1 -1) (1 -1 -1 1)))

(define (net inputs weights b)
  (+ b (apply + (map (lambda(x y) (* x y))
                     (map (lambda(x) (car x)) inputs)
                     weights))))

(define (f_net y_in)
  (cond [(> y_in *theta*) 1]
        [(and (<= y_in *theta*)
              (>= y_in (* -1 *theta*))) 0]
        [(< y_in (* -1 *theta*)) -1]))

(define (weight_update weight input target)
  (+ weight (* *alpha* input target)))

(define (consume_one_input inputs)
  (map (lambda(x) (cdr x)) inputs))

(define (separate_inputs inputs)
  (map (lambda(x) (car x)) inputs))

(define (update? out target)
  (if (not (= out target)) #t
      #f))

(define (one_run inputs bias target weights [count 0])
  (if (null? target) (list weights bias count)
      (if (update? (f_net (net inputs weights bias)) (car target))
          (one_run (consume_one_input inputs)
                   (+ bias (* *alpha* (car target)))
                   (cdr target)
                   (map (lambda(x y) (weight_update  x y (car target))) 
                        weights
                        (separate_inputs inputs))
                   (+ 1 count))
          (one_run (consume_one_input inputs)
                   bias
                   (cdr target)
                   weights
                   count))))

(define (train inputs bias target weights [runs 0])
  (if (= (last (one_run inputs bias target weights)) 0) (list weights bias runs)
      (train inputs
             (second (one_run inputs bias target weights))
             target
             (first (one_run inputs bias target weights))
             (+ runs 1))))

(define (set-weights! lst)
  (set! *weights* (car lst)))

(define (set-bias! lst)
  (set! *b* (cadr lst)))