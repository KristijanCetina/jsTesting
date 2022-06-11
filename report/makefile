.PHONY: all clean

FILES =  DiplomskiRad-KristijanCetina
OUTPUT = $(FILES).pdf

$(OUTPUT): *.tex literatura.bib
	@echo "Building $(OUTPUT)"
	@# 2 puta da bi sadržaj bio ažuran + literatura:
	@pdflatex $(FILES).tex > /dev/null
	@bibtex $(FILES).aux > /dev/null
	@pdflatex $(FILES).tex > /dev/null
	@echo "$(OUTPUT) created"
	
clean:
	@$(RM) -f *.dvi *.log *.aux *.swp *.swo *.toc *.idx *.lof *.out *.bbl *.blg *.fls *.out *.fdb_latexmk *.synctex.gz

wipe:
	@$(MAKE) clean
	@$(RM) -f $(OUTPUT)
