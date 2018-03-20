#lang racket
;;Hebb rule for tranning neural networks:
;;Learning occurs by modification of the synapse
;;strengths (weights).
;;Increase the weights of neurons that fires
;;at the same time and the weights of neurons that,
;;at the same time, do not fire.
;;We are using bipolar inputs and targets (1 and -1).

(define *theta* 0)
(define *and-target* '(1 -1 -1 -1))
(define *or-target* '(-1 1 1 1))
(define *inputs* '((1 1 -1 -1) (1 -1 1 -1)))
(define *x-target* '(1))
(define *x-inputs* '((1) (-1) (-1) (-1) (1) (-1) (1) (-1) (1) (-1) (-1) (-1) (1) (-1) (-1) (-1) (1) (-1) (1) (-1) (1) (-1) (-1) (-1) (1)))
(define *o-inputs* '((-1) (1) (1) (1) (-1) (1) (-1) (-1) (-1) (1) (1) (-1) (-1) (-1) (1) (1) (-1) (-1) (-1) (1) (-1) (1) (1) (1) (-1)))

(define (bias_update1 b t)
  (if (= t 1) (+ b 1)
      (- b 1)))

(define (weights_update inputs target weights)
  (cond [(null? target) weights]
        [else
         (weights_update
          (map (lambda(x) (cdr x)) inputs)
          (cdr target)
          (map (lambda(x y) (+ x y))
              weights
              (map (lambda(x) (* (car x) (car target))) inputs)))]))

(define (bias_update b target)
  (if (null? target) b
      (bias_update (bias_update1 b (car target)) (cdr target))))

(define (hebb_training inputs target weights b)
  (flatten (list (weights_update inputs target weights)
        (bias_update b target))))

;;The neuron:
(define (net inputs weights b)
  (+ b (apply + (map (lambda(x y) (* x y)) (map (lambda(x) (car x)) inputs) weights))))

(define (f_net inputs weights b)
  (if (>= (net inputs weights b) *theta*) 1
      -1))

(define (neural-network inputs hebb_data)
  (let loop [(x inputs)
             (b (last hebb_data))
             (weights (reverse (cdr (reverse hebb_data))))
             (res '())]
    (if (null? (car x)) (reverse res)
    (loop
     (map (lambda(s) (cdr s)) x)
     b
     weights
     (cons (f_net x weights b) res)))))
