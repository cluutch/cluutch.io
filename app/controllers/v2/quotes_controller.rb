class V2::QuotesController < ApplicationController
  before_action :set_v2_quote, only: %w[ show edit update destroy ]

  # GET /v2/quotes
  # GET /v2/quotes.json
  def index
    @v2_quotes = V2::Quote.all
  end

  # GET /v2/quotes/1
  # GET /v2/quotes/1.json
  def show
  end

  # GET /v2/quotes/new
  def new
    @v2_quote = V2::Quote.new
  end

  # GET /v2/quotes/1/edit
  def edit
  end

  # POST /v2/quotes
  # POST /v2/quotes.json
  def create
    @v2_quote = V2::Quote.new(v2_quote_params)

    respond_to do |format|
      if @v2_quote.save
        format.html { redirect_to @v2_quote, notice: "Quote was successfully created." }
        format.json { render :show, status: :created, location: @v2_quote }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @v2_quote.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /v2/quotes/1
  # PATCH/PUT /v2/quotes/1.json
  def update
    respond_to do |format|
      if @v2_quote.update(v2_quote_params)
        format.html { redirect_to @v2_quote, notice: "Quote was successfully updated." }
        format.json { render :show, status: :ok, location: @v2_quote }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @v2_quote.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /v2/quotes/1
  # DELETE /v2/quotes/1.json
  def destroy
    @v2_quote.destroy
    respond_to do |format|
      format.html { redirect_to v2_quotes_url, notice: "Quote was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_v2_quote
      @v2_quote = V2::Quote.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def v2_quote_params
      params.require(:v2_quote).permit(:vendor_name, :vendor_url, :vendor_branch, :is_primary, :price_per_ounce, :v2_jurisdiction_id)
    end
end
