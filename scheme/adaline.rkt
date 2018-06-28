#lang racket

(define p1 '(1 1))
(define p2 '(1 0))
(define p3 '(0 1))
(define p4 '(0 0))
(define target '(1 -1 -1 -1))
(define tolerance 3)

(define (y_in b inputs weights)
  ;;Apply y_in to a pair of inputs...
  (+ b (apply + (map (lambda(x y) (* x y)) inputs weights))))

(define (b_update b alpha target yIn)
  (+ b (* alpha (- target yIn))))

(define (w_update w alpha target yIn input)
  (+  w (* alpha (- target yIn) input)))

